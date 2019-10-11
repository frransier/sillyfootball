import React from "react"
import { Box, Text, Heading, Button } from "rebass"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { motion } from "framer-motion"

const WhitePaperPage = () => (
  <Layout>
    <SEO title="White paper" />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        stiffness: 200,
      }}
    >
      <Box width={[1, 4 / 5, 3 / 5]} mx="auto">
        <Heading m={3} fontWeight="normal">
          Fantasy football ska vara enkelt
        </Heading>
        <Text sx={{ fontFamily: "body", lineHeight: "body" }} m={3}>
          Alla som har spelat Drömelvan eller Fantasy PL vet att fantasy
          football kan vara onödigt krångligt och tidskrävande. Det tar tid att
          ta ut sin elva, poängsystemet är jobbigt att lära sig och man tvingas
          välja spelare från blåbärslag för att få plats med sina stjärnor.
          Dessutom tvingas du att committa dig till spelet tills det avslutas
          flera månader senare.
        </Text>
        <Text sx={{ fontFamily: "body", lineHeight: "body" }} m={3}>
          Sillyfootball vill ändra på det. Vi tror att fantasy football är som
          roligast när det är enkelt. Det ska gå fort att skapa sitt lag och det
          ska gå fort att veta om man har vunnit. Det ska vara enkelt att förstå
          när man får poäng och man ska ha full frihet att ta ut de spelare man
          tror på. Den som är sent ute kan kasta ihop ett lag på ett par minuter
          och den som gillar att värpa kan fila på sitt lag från måndag till
          lördag varje vecka. Sillyfootball är lätt att lära sig och svårt att
          bemästra.
        </Text>
        <Heading m={3} fontWeight="normal">
          Reglerna är enkla
        </Heading>
        <Text sx={{ fontFamily: "body", lineHeight: "body" }} mt={3} ml={3}>
          - Välj 5 spelare
        </Text>
        <Text sx={{ fontFamily: "body", lineHeight: "body" }} ml={3}>
          - Få 1 poäng per mål eller assist
        </Text>
        <Text sx={{ fontFamily: "body", lineHeight: "body" }} m={3}>
          En omgång består av 12 matcher från Premier League, La Liga, Serie A
          och Bundesliga och pågår från lördag till söndag varje helg. De
          deltagare som samlar ihop flest poäng delar på prispotten
        </Text>
        <Heading m={3} fontWeight="normal">
          Easy to learn, hard to master
        </Heading>
        <Text sx={{ fontFamily: "body", lineHeight: "body" }} m={3}>
          Din uppgift som deltagare är både enkel och svår: välj de 5 spelarna
          som du tror gör flest mål och assist. Om många deltagare vinner blir
          utdelningen lägre, om du är ensam vinnare vinner du stort - därför kan
          det löna sig att tänka utanför boxen och träffa poäng på spelare som
          få deltagare har valt.
        </Text>
        <Text sx={{ fontFamily: "body", lineHeight: "body" }} m={3}>
          Det behöver inte vara krångligare än så. Du behöver inte välja en full
          elva plus avbytarbänk, behöver inte bry dig om att välja försvarare
          eller målvakter och du behöver inte slänga in spelare du egentligen
          inte tror på för att hålla dig till en budget. Sillyfootball skiljer
          sig från andra fantasy football-spel genom att vara så enkelt som
          möjligt och genom att fokusera på lag och spelare från topplagen i de
          största ligorna i Europa.
        </Text>
        <Heading m={3} fontWeight="normal">
          Sillyfootball beta
        </Heading>
        <Text sx={{ fontFamily: "body", lineHeight: "body" }} m={3}>
          Bäst av allt är att Sillyfootball är helt gratis att spela under
          betaperioden som pågår just nu. Varje vecka kan du vara med och tävla
          om 1000kr som delas ut till vinnarna. Allt du behöver göra är att
          välja dina 5 spelare och lämna in ditt lag genom att ange din email.
        </Text>
        <Box textAlign="center" my={4}>
          <Link to="/game/">
            <Button mx={1} fontSize={[5, 6]}>
              <Heading fontWeight="normal" color="black">
                Spela nu
              </Heading>
            </Button>
          </Link>
        </Box>
      </Box>
    </motion.div>
  </Layout>
)

export default WhitePaperPage
