import S from "@sanity/desk-tool/structure-builder";
import { IoMdSettings } from "react-icons/io/";
import { GiSoccerBall, GiSoccerField } from "react-icons/gi";
import { FiSlack } from "react-icons/fi";

const hiddenDocTypes = listItem =>
  !["settings", "player", "team", "matches", "playmaker"].includes(
    listItem.getId()
  );

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Settings")
        .icon(IoMdSettings)
        .child(
          S.editor()
            .id("settings")
            .schemaType("settings")
            .documentId("settings")
        ),
      S.listItem()
        .title("Players")
        .icon(GiSoccerBall)
        .schemaType("player")
        .child(S.documentTypeList("player").title("Player")),
      S.listItem()
        .title("Teams")
        .icon(FiSlack)
        .schemaType("team")
        .child(S.documentTypeList("team").title("Team")),
      S.listItem()
        .title("Matches")
        .icon(GiSoccerField)
        .schemaType("matches")
        .child(S.documentTypeList("matches").title("Match")),
      S.listItem()
        .title("Playmakers")
        .icon(GiSoccerField)
        .schemaType("playmaker")
        .child(S.documentTypeList("playmaker").title("Playmaker")),
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ]);
