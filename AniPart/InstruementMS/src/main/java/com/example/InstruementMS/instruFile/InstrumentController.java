package com.example.InstruementMS.instruFile;

import com.example.InstruementMS.external.User;
import com.example.InstruementMS.external.UserClient;
import com.example.InstruementMS.util.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/machine")
public class InstrumentController {

    @Autowired
    private InstrumentRepo instrumentRepo;
    @Autowired
    private UserClient userClient;

    @PostMapping
    public ApiResponse<Instrument>createInstrument(@RequestBody Instrument instrument,
                                                   HttpServletRequest request)
    {
        User user = validateRequest(request);
        instrument.setLastModifiedBy(user.getId());
        Instrument saved = instrumentRepo.save(instrument);
        return ApiResponse.onSuccess("Successfully created instrument", saved);
    }

    // Read (Get by ID)
    @GetMapping("/{id}")
    public ApiResponse<Instrument> getInstrumentById(@PathVariable Long id,
                                                     HttpServletRequest request) {
        User user = validateRequest(request);
        if(user == null) {
            return ApiResponse.onError("User not found");
        }
        Instrument instrument = instrumentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Instrument not found"));
        return ApiResponse.onSuccess("Instrument fetched successfully", instrument);
    }

    // Read All
    @GetMapping
    public ApiResponse<List<Instrument>> getAllInstruments(HttpServletRequest request) {
        User user = validateRequest(request);
        if(user == null) {
            return ApiResponse.onError("User not found");
        }
        List<Instrument> instruments = instrumentRepo.findAll();
        return ApiResponse.onSuccess("All instruments fetched successfully", instruments);
    }

    // Update
    @PutMapping("/{id}")
    public ApiResponse<Instrument> updateInstrument(@PathVariable Long id,
                                                    @RequestBody Instrument updatedInstrument,
                                                    HttpServletRequest request) {
        User user = validateRequest(request);
        if(user == null) {
            return ApiResponse.onError("User not found");
        }
        Instrument existing = instrumentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Instrument not found"));

        existing.setName(updatedInstrument.getName()); // Assuming Instrument has a 'name' field
        existing.setDescription(updatedInstrument.getDescription());
        existing.setActive(updatedInstrument.isActive());
        existing.setImage(updatedInstrument.getImage());
        existing.setLastModifiedBy(user.getId());
        Instrument saved = instrumentRepo.save(existing);
        return ApiResponse.onSuccess("Instrument updated successfully",
                saved);
    }

    // Delete
    @DeleteMapping("/{id}")
    public ApiResponse<Instrument> deleteInstrument(@PathVariable Long id,
                                                    HttpServletRequest request) {
        User user = validateRequest(request);
        if(user == null) {
            return ApiResponse.onError("User not found");
        }
        Instrument existing = instrumentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Instrument not found"));
        existing.setLastModifiedBy(user.getId());
        instrumentRepo.delete(existing);
        return ApiResponse.onSuccess("Instrument deleted successfully", existing);
    }

    User validateRequest(HttpServletRequest request)
    {
        String bearerToken = request.getHeader("Authorization");
        User user = userClient.verifyJWT(bearerToken).getData();
        return user;
    }
}
