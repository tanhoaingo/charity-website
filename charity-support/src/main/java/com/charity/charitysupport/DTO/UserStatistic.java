package com.charity.charitysupport.DTO;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserStatistic {
    private String username;
    private String fullname;
    private String avatar;
    private String phoneNumber;
    private String email;
    private Integer times;
    private BigDecimal total;
}
