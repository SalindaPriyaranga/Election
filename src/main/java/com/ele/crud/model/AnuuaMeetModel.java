package com.ele.crud.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AnuuaMeetModel {
    @Id
    private int anMeid;
    @ManyToOne
    @JoinColumn(name = "partyId")
    private PartyModel partyModel;

    private String anMeeMinuteRef;
    private Date anMeeRecievDate;
    private String anMeeHeldDate;
    private Date anMeCreateDate;
    private Date anMeUpdateDate;

}
