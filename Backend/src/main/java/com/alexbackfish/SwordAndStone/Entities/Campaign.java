package com.alexbackfish.SwordAndStone.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Campaign")
public class Campaign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String campaignName;
    private String campaignDescription;
    @Column(unique = true)
    private String URL;
    // Additional fields related to the Campaign entity

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private WebUser user;

    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PlayerCharacter> playerCharacters = new HashSet<>();

    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Shop> shops = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "campaign_members",
            joinColumns = @JoinColumn(name = "campaign_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private final Set<WebUser> members = new HashSet<>();

    public Campaign() {
    }

    public Set<Shop> getShops() {
        return shops;
    }

    public void addShop(Shop shop) {
        this.shops.add(shop);
    }

    public void addMember(WebUser user) {
        this.members.add(user);
    }

    public void removeMember(WebUser user) {
        this.members.remove(user);
    }

    public Set<WebUser> getMembers() {
        return this.members;
    }

    public boolean isMember(WebUser user) {
        return this.members.contains(user);
    }

    public Set<PlayerCharacter> getPlayerCharacters() {
        return playerCharacters;
    }

    public void addPlayerCharacter(PlayerCharacter playerCharacter) {
        playerCharacters.add(playerCharacter);
    }

    // Method to remove a campaign from the user
    public void removePlayerCharacter(PlayerCharacter playerCharacter) {
        playerCharacters.remove(playerCharacter);
    }

    public Long getId() {
        return id;
    }

    public String getCampaignName() {
        return campaignName;
    }

    public void setCampaignName(String campaignName) {
        this.campaignName = campaignName;
    }

    public String getURL() {
        return URL;
    }

    public void setURL(String URL) {
        this.URL = URL;
    }

    public WebUser getUser() {
        return user;
    }

    public void setUser(WebUser user) {
        this.user = user;
    }

    public String getCampaignDescription() {
        return campaignDescription;
    }

    public void setCampaignDescription(String campaignDescription) {
        this.campaignDescription = campaignDescription;
    }

    // Other getters and setters
}