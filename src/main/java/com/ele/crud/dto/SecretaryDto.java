package com.ele.crud.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonSerialize
public class SecretaryDto {
    private int sId;
    private String sName;
    private Date startDate;
    private Date endDate;
    private String sPhoto;
    private String letterUrl;
    private String meetingRef;
    private String contactNo;
    private String status;
    private String sNIC;
    private String checked1;
    private String checked2;
    private String checked3;
}
