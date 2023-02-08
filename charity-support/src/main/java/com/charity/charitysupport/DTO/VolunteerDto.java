package com.charity.charitysupport.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VolunteerDto {
    private Long postId;
    private byte[] img;
    private String title;
    private String organization;
    private String status;
}
