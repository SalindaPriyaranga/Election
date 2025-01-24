package com.ele.crud.repo;

import com.ele.crud.model.OfficersModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfficersRepo extends JpaRepository<OfficersModel,Integer> {

}
