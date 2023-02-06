package com.charity.charitysupport.controller;

import java.util.List;

import com.charity.charitysupport.DTO.DonationDto;
import com.charity.charitysupport.DTO.DonationRequest;
import com.charity.charitysupport.service.DonationService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/donation")
@AllArgsConstructor
public class DonationController {
    
    private final DonationService donationService;

    @PostMapping("/create")
    public ResponseEntity<Void> create(@RequestBody DonationRequest donationRequest){
        donationService.create(donationRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<DonationDto>> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(donationService.getAll());
    }

    @GetMapping("/get/{postId}")
    public ResponseEntity<List<DonationDto>> getByPostId(@PathVariable Long postId){
        return ResponseEntity.status(HttpStatus.OK).body(donationService.getByPostId(postId));
    }
    
}
