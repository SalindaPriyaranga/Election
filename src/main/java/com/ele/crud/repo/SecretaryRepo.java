package com.ele.crud.repo;

import com.ele.crud.model.SecretaryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SecretaryRepo extends JpaRepository<SecretaryModel,Integer> {
}
