package com.ele.crud.repo;

import com.ele.crud.model.ConstiModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConstiRepo extends JpaRepository <ConstiModel,Integer> {
}
