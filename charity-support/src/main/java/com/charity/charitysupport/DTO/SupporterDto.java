package com.charity.charitysupport.DTO;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupporterDto {
    private String avatar;
    private String username;
    private String fullname;
    private Long times;
    private BigDecimal total;
}
