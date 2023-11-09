package com.alexbackfish.SwordAndStone.Entities;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "WebUser")
public class WebUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Campaign> campaigns = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PlayerCharacter> playerCharacters = new HashSet<>();

    public WebUser() {
    }

    // Getters and setters for all fields including campaigns


    public Set<PlayerCharacter> getPlayerCharacters() {
        return playerCharacters;
    }

    public void addPlayerCharacter(PlayerCharacter playerCharacter) {
        playerCharacters.add(playerCharacter);
        playerCharacter.setUser(this);
    }

    // Method to remove a campaign from the user
    public void removePlayerCharacter(PlayerCharacter playerCharacter) {
        campaigns.remove(playerCharacter);
        playerCharacter.setUser(null);
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public Set<Campaign> getCampaigns() {
        return campaigns;
    }

    public void setCampaigns(Set<Campaign> campaigns) {
        this.campaigns = campaigns;
    }

    // Method to add a campaign to the user
    public void addCampaign(Campaign campaign) {
        campaigns.add(campaign);
        campaign.setUser(this);
    }

    // Method to remove a campaign from the user
    public void removeCampaign(Campaign campaign) {
        campaigns.remove(campaign);
        campaign.setUser(null);
    }
}
