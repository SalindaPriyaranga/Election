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
public class ContactModel {
    @Id
    private int cid;
    private String cType1;
    private String cType2;
    private String cType3;
    private String cDetail;
    private Date cCreateDate;
    private Date cUpdateDate;

}
