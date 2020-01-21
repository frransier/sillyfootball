import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import matchday from "./documents/matchday";
import player from "./documents/player";
import team from "./documents/team";
import user from "./documents/user";
import news from "./documents/news";
import tag from "./documents/tag";
import page from "./documents/page";

import tweet from "./objects/tweet";
import video from "./objects/video";
import event from "./objects/event";
import score from "./objects/score";
import entry from "./objects/entry";
import match from "./objects/match";
import matchTeam from "./objects/matchTeam";
import matchScore from "./objects/matchScore";
import season from "./objects/season";
import blockContent from "./objects/blockContent";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    tweet,
    video,
    page,
    tag,
    news,
    blockContent,
    season,
    matchScore,
    matchTeam,
    matchday,
    player,
    team,
    event,
    score,
    user,
    entry,
    match
  ])
});
