package com.ele.crud.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class SecretaryModel {
    @Id
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
    private Date sCreateDate;
    private Date sUpdateDate;

}
