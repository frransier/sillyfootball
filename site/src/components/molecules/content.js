/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Container from "../atoms/container"

const Content = () => (
  <Container>
    <div>
      <Styled.h2>Fantasy Football Without Borders</Styled.h2>
      <Styled.p sx={{ fontSize: 3 }}>
        Traditional fantasy football games are tied to a particular league or
        competition. Silly Football is not like traditional fantasy football
        games because each round consists of the best matches from the top
        leagues of European football: Premier League, Bundesliga, La Liga, Serie
        A, Champions League, Europa League. Whenever top football is being
        played, Silly Football will be there.
      </Styled.p>
    </div>
    <div>
      <Styled.h2>Without Budgets</Styled.h2>
      <Styled.p sx={{ fontSize: 3 }}>
        Traditional fantasy football limits your choices by imposing budgets
        which makes it harder for you to select your team. Silly Football is not
        like traditional fantasy football games because you are free to choose
        the players you believe in. However, players generate different amounts
        of points based on how likely they are to score goals or make assists.
        Find the right combination to maximise your score.
      </Styled.p>
    </div>
    <div>
      <Styled.h2>Keeping It Simple & Silly</Styled.h2>
      <Styled.p sx={{ fontSize: 3 }}>
        By now you know that Silly Football is not like traditional fantasy
        football games. We try to keep things as simple as possible. No need to
        pick 11 players plus substitutes. All you need to do is pick 3 players
        and follow the scores on our Livescore page. Silly Football is your new
        top football companion.
      </Styled.p>
    </div>
  </Container>
)

export default Content
