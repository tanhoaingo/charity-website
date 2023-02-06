package com.charity.charitysupport.controller;

import java.util.List;

import com.charity.charitysupport.DTO.HomeData;
import com.charity.charitysupport.DTO.StatisticDto;
import com.charity.charitysupport.DTO.UserStatistic;
import com.charity.charitysupport.DTO.VolunteerRegistration;
import com.charity.charitysupport.DTO.VolunteerStatistic;
import com.charity.charitysupport.service.StatisticService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/statistic")
@AllArgsConstructor
public class StatisticController {
    
    private final StatisticService statisticService;

    @GetMapping("/home/data")
    public ResponseEntity<HomeData> getHomeData(){
        return ResponseEntity.status(HttpStatus.OK).body(statisticService.getHomeData());
    }

    @GetMapping("/overview")
    public ResponseEntity<StatisticDto> getOverview(){
        return ResponseEntity.status(HttpStatus.OK).body(statisticService.getOverview());
    }

    @GetMapping("/overview/{id}")
    public ResponseEntity<StatisticDto> getOverviewByPostId(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(statisticService.getOverviewByPostId(id));
    }

    @GetMapping("/get/supporters")
    public ResponseEntity<List<UserStatistic>> getSupporters(){
        return ResponseEntity.status(HttpStatus.OK).body(statisticService.getSupporters());
    }

    @GetMapping("/get/volunteers")
    public ResponseEntity<List<VolunteerStatistic>> getVolunteers(){
        return ResponseEntity.status(HttpStatus.OK).body(statisticService.getVolunteers());
    }

    @GetMapping("get/registration/volunteer")
    public ResponseEntity<List<VolunteerRegistration>> getVolunteerRegistration(){
        return ResponseEntity.status(HttpStatus.OK).body(statisticService.getVolunteerRegistration());
    }
}
