package com.charity.charitysupport.service;

import java.util.List;

import com.charity.charitysupport.DTO.HomeData;
import com.charity.charitysupport.DTO.StatisticDto;
import com.charity.charitysupport.DTO.UserStatistic;
import com.charity.charitysupport.DTO.VolunteerRegistration;
import com.charity.charitysupport.DTO.VolunteerStatistic;
import com.charity.charitysupport.repository.DonationRepository;
import com.charity.charitysupport.repository.PostRepository;
import com.charity.charitysupport.repository.UserRepository;
import com.charity.charitysupport.repository.VolunteerRepository;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StatisticService {

    private final DonationRepository donationRepository;
    private final VolunteerRepository volunteerRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public HomeData getHomeData(){
        return new HomeData(postRepository.findAll().size(), donationRepository.getNumberOfSupporter(), donationRepository.getSumOfAmount());
    }

    public StatisticDto getOverview() {
        return StatisticDto.builder().sumOfAmount(donationRepository.getSumOfAmount())
                .numberOfSupporter(donationRepository.getNumberOfSupporter())
                .numberOfVolunteer(volunteerRepository.getNumberOfVolunteer())
                .supporters(donationRepository.getSupporters())
                .contributionStatistics(donationRepository.getContributionStatistics())
                .organizations(postRepository.getOrganization()).build();
    } 
    public StatisticDto getOverviewByPostId(Long id) {
        return StatisticDto.builder().sumOfAmount(donationRepository.getSumOfAmountByPostId(id))
                .numberOfSupporter(donationRepository.getNumberOfSupporterByPostId(id))
                .numberOfVolunteer(volunteerRepository.getNumberOfVolunteerByPostId(id))
                .supporters(null)
                .contributionStatistics(donationRepository.getContributionStatisticsByPostId(id))
                .organizations(null).build();
    }

    public List<UserStatistic> getSupporters() {
        List<UserStatistic> list = userRepository.getUserStatistics();
        for (UserStatistic userStatistic : list) {
            String phoneNumber = userStatistic.getPhoneNumber();
            if (phoneNumber.length() > 3)
                userStatistic.setPhoneNumber(
                        new StringBuilder(phoneNumber.substring(0, phoneNumber.length() - 3) + "***").toString());
        }
        return list;
    }

    public List<VolunteerStatistic> getVolunteers() {
        List<VolunteerStatistic> list = userRepository.getVolunteerStatistics();
        for (int i = 0; i < list.size(); i++) {
            VolunteerStatistic volunteerStatistic = list.get(i);
            volunteerStatistic.setIndex(i + 1);
            Integer point = volunteerStatistic.getPoint();
            if (point < 1000) {
                volunteerStatistic.setRank("hangdong");
            } else if (point < 5000) {
                volunteerStatistic.setRank("hangbac");
            } else if (point < 10000) {
                volunteerStatistic.setRank("hangvang");
            } else {
                volunteerStatistic.setRank("kimcuong");
            }
        }
        return list;
    }

    public List<VolunteerRegistration> getVolunteerRegistration() {
        return volunteerRepository.getVolunteers();
    }
}
