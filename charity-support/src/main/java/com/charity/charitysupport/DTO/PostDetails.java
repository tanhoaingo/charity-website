package com.charity.charitysupport.DTO;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.charity.charitysupport.entity.Image;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostDetails {
    private Long id;
    private String title;
    private String organization;
    private String type;
    private Date postDate;
    private Long remainingDay;
    private String[] content;
    private BigDecimal contribution;
    private BigDecimal expectation;
    private List<Image> images;
    private List<DonationDetails> donationDetails;
    private String volunteer;
    private Integer numberOfVolunteers;
}


