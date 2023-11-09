package com.alexbackfish.SwordAndStone.DTOs;

public class CreateCharacterDTO {
    private String username;
    private Long campaignId;
    private String characterName;
    private String characterDescription;
    private String characterImageURL;

    public CreateCharacterDTO() {
    }

    public Long getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(Long campaignId) {
        this.campaignId = campaignId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCharacterName() {
        return characterName;
    }

    public void setCharacterName(String characterName) {
        this.characterName = characterName;
    }

    public String getCharacterDescription() {
        return characterDescription;
    }

    public void setCharacterDescription(String characterDescription) {
        this.characterDescription = characterDescription;
    }

    public String getCharacterImageURL() {
        return characterImageURL;
    }

    public void setCharacterImageURL(String characterImageURL) {
        this.characterImageURL = characterImageURL;
    }
}
