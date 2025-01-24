package com.ele.crud.repo;

import com.ele.crud.model.MPartyModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MPartyRepo extends JpaRepository<MPartyModel,Integer> {


}
