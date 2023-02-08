package com.charity.charitysupport.service;



import java.util.Date;
import java.util.List;

import com.charity.charitysupport.DTO.DonationDto;
import com.charity.charitysupport.DTO.DonationRequest;
import com.charity.charitysupport.entity.Donation;
import com.charity.charitysupport.entity.Post;
import com.charity.charitysupport.entity.User;
import com.charity.charitysupport.repository.DonationRepository;
import com.charity.charitysupport.repository.PostRepository;
import com.charity.charitysupport.repository.UserRepository;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DonationService {

    private final DonationRepository donationRepository;
    private final AuthService authService;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public void create(DonationRequest donationRequest) {
        User user = authService.getCurrentUser();
        user.setTotal(user.getTotal().add(donationRequest.getAmount()));
        userRepository.save(user);
        Post post = postRepository.findById(donationRequest.getPostId())
                .orElseThrow(() -> new RuntimeException("Can't find post with id: " + donationRequest.getPostId()));
        post.setContribution(post.getContribution().add(donationRequest.getAmount()));
        postRepository.save(post);
        Donation donation = new Donation();
        donation.setAmount(donationRequest.getAmount());
        donation.setMessage(donationRequest.getMessage());
        donation.setIsAnonymous(donationRequest.getIsAnonymous());
        donation.setPaymentMethod(donationRequest.getPaymentMethod());
        donation.setPost(post);
        donation.setUser(user);
        donation.setCreateAt(new Date());
        donationRepository.save(donation);
    }

    public List<DonationDto> getAll(){
        List<DonationDto> list = donationRepository.getAllDonation();
        for (DonationDto donationDto : list) {
            if(donationDto.getIsAnonymous()){
                donationDto.setAvatar("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToZZjg_l0c8MyET9IcMmPBUYVP8PDKqBiT-OLHBVch7tk0GpEO0bxTgWfYJy3LGXLFDmI&usqp=CAU");
                donationDto.setFullname("Anonymous");
                donationDto.setUsername("anonymous");
            }
        }
        return list;
    }

    public List<DonationDto> getByPostId(Long postId){
        List<DonationDto> list = donationRepository.getAllDonationByPostId(postId);
        for (DonationDto donationDto : list) {
            if(donationDto.getIsAnonymous()){
                donationDto.setAvatar("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToZZjg_l0c8MyET9IcMmPBUYVP8PDKqBiT-OLHBVch7tk0GpEO0bxTgWfYJy3LGXLFDmI&usqp=CAU");
                donationDto.setFullname("Anonymous");
                donationDto.setUsername("anonymous");
            }
        }
        return list;
    }
}
