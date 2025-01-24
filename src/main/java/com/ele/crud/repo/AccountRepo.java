package com.ele.crud.repo;

import com.ele.crud.model.AccountModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepo extends JpaRepository<AccountModel,Integer> {
}
