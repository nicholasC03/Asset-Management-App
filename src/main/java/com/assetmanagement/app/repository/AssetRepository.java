package com.assetmanagement.app.repository;

import com.assetmanagement.app.model.Asset;
import com.assetmanagement.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    List<Asset> findByUser(User user);
    List<Asset> findByUserOrderByCreatedAtDesc(User user);
    List<Asset> findByUserAndNameContainingIgnoreCase(User user, String name);
}
