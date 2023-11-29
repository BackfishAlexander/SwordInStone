package com.alexbackfish.SwordAndStone.DTOs;

public class CreateCampaignDTO {
    private String campaignName;
    private String campaignDescription;
    private String username;

    public CreateCampaignDTO() {
    }

    public String getCampaignName() {
        return campaignName;
    }

    public void setCampaignName(String campaignName) {
        this.campaignName = campaignName;
    }

    public String getCampaignDescription() {
        return campaignDescription;
    }

    public void setCampaignDesc(String campaignDescription) {
        this.campaignDescription = campaignDescription;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
