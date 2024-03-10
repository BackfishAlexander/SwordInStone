package com.alexbackfish.SwordAndStone.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "shopitem")
public class ShopItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shopItemId;
    private int shopItemCount;
    private int updatedGoldCost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id") // This should match the column name in the database.
    private Shop shop; // This is the reference back to the Shop entity.

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id") // Foreign key for the Item entity
    private Item item; // Reference to the Item entity
}
