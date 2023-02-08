package com.charity.charitysupport.DTO;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostResponse {
    private Long id;
    private String title;
    private String organization;
    private String type;
    private BigDecimal contribution;
    private BigDecimal expectation;
    private Long remainingDay;
    private byte[] image;
}
