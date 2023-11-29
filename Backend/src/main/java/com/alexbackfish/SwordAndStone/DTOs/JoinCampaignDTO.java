package com.alexbackfish.SwordAndStone.DTOs;

public class JoinCampaignDTO {
    private String username;
    private Long campaignId;

    public JoinCampaignDTO() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(Long campaignId) {
        this.campaignId = campaignId;
    }
}
