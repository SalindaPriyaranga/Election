package com.ele.crud.repo;

import com.ele.crud.model.PartyModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartyRepo extends JpaRepository<PartyModel,Integer> {

}
