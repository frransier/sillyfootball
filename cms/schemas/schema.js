// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import matchday from "./documents/matchday";
import ticket from "./documents/ticket";
import user from "./documents/user";
import team from "./documents/team";
import player from "./documents/player";
import score from "./documents/score";
import match from "./documents/match";
import season from "./documents/season";
import event from "./objects/event";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    matchday,
    ticket,
    user,
    team,
    player,
    score,
    match,
    season,
    event,
  ]),
});
