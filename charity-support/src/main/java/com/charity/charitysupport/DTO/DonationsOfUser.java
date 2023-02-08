package com.charity.charitysupport.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DonationsOfUser {
    private String username;
    private String fullname;
    private String avatar;
}
