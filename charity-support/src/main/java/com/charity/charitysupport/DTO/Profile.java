package com.charity.charitysupport.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Profile {
    private String username;
    private String fullname;
    private String email;
    private String phoneNumber;
    private String address; 
    private String description;
    private String avatar;
}
