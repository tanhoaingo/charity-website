package com.charity.charitysupport.controller;

import java.util.List;

import com.charity.charitysupport.DTO.VolunteerDto;
import com.charity.charitysupport.service.AuthService;
import com.charity.charitysupport.service.VolunteerService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("volunteer")
@AllArgsConstructor
public class VolunteerController {
    
    private final VolunteerService volunteerService;

    @GetMapping("/create/{postId}")
    public ResponseEntity<Void> create(@PathVariable Long postId){
        volunteerService.create(postId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<Void> delete(@PathVariable Long postId){
        volunteerService.delete(postId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/find/volunteersOfUser")
    public ResponseEntity<List<VolunteerDto>> getVolunteersOfUser(){
        return ResponseEntity.status(HttpStatus.OK).body(volunteerService.getVolunteersOfUser());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody String status){
        volunteerService.update(id, status);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/evaluate/{id}/{point}")
    public ResponseEntity<Void> evaluate(@PathVariable Long id, @PathVariable Integer point){
        volunteerService.evaluate(id, point);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
