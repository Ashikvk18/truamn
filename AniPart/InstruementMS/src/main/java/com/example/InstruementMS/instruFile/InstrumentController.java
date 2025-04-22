package com.example.InstruementMS.instruFile;

import com.example.InstruementMS.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/machine")
public class InstrumentController {

    @Autowired
    InstrumentRepo instrumentRepo;

    @PostMapping
    public ApiResponse<Instrument>createInstrument(@RequestBody Instrument instrument)
    {
        Instrument saved = instrumentRepo.save(instrument);
        return ApiResponse.onSuccess("Successfully created instrument", saved);
    }

    // Read (Get by ID)
    @GetMapping("/{id}")
    public ApiResponse<Instrument> getInstrumentById(@PathVariable Long id) {
        Instrument instrument = instrumentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Instrument not found"));
        return ApiResponse.onSuccess("Instrument fetched successfully", instrument);
    }

    // Read All
    @GetMapping
    public ApiResponse<List<Instrument>> getAllInstruments() {
        List<Instrument> instruments = instrumentRepo.findAll();
        return ApiResponse.onSuccess("All instruments fetched successfully", instruments);
    }

    // Update
    @PutMapping("/{id}")
    public ApiResponse<Instrument> updateInstrument(@PathVariable Long id, @RequestBody Instrument updatedInstrument) {
        Instrument existing = instrumentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Instrument not found"));

        existing.setName(updatedInstrument.getName()); // Assuming Instrument has a 'name' field
        existing.setDescription(updatedInstrument.getDescription());
        existing.setActive(updatedInstrument.isActive());
        existing.setImage(updatedInstrument.getImage());
        Instrument saved = instrumentRepo.save(existing);
        return ApiResponse.onSuccess("Instrument updated successfully",
                saved);
    }

    // Delete
    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteInstrument(@PathVariable Long id) {
        Instrument existing = instrumentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Instrument not found"));

        instrumentRepo.delete(existing);
        return ApiResponse.onSuccess("Instrument deleted successfully", null);
    }
}
