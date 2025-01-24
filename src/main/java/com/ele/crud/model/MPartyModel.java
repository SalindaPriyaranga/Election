package com.ele.crud.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.mapping.Set;

import java.util.Date;
import java.util.HashSet;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MPartyModel {

    @Id
    private int pId;
    private String pName;
    private String pSymbol ;
    private String pSecretaryName  ;
    private String pSymbolUrl   ;
    private String pFileNo;
    private String pAppRef;
    private Date pRegDate   ;
    private int pRegStatus;
    private Date pCreateDate ;
    private Date pUpdateDate ;
    private String pType;


//    @OneToMany(mappedBy = "mPartyModel")
//   private Set <OfficersModel> officersModelSet ;
}
