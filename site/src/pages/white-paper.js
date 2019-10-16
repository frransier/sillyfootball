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
        <Heading m={3} fontWeight="heading">
          Fantasy football ska vara enkelt
        </Heading>
        <Text sx={{ fontFamily: "body", lineHeight: "body" }} m={3}>
          Alla som har spelat Drömelvan eller Fantasy PL vet att fantasy
          football kan vara onödigt krångligt och tidskrävande. Det tar tid att
          ta ut sin elva, poängsystemet är jobbigt att lära sig och man tvingas
          välja spelare från blåbärslag för att få plats med sina stjärnor.
        </Text>
        <Text sx={{ fontFamily: "body", lineHeight: "body" }} m={3}>
          Sillyfootball vill ändra på det. Vi tror att fantasy football är som
          roligast när det är enkelt. Det ska gå fort att skapa sitt lag och det
          ska gå fort att veta om man har vunnit. Det ska vara enkelt att förstå
          när man får poäng och man ska ha full frihet att ta ut de spelare man
          tror på.
        </Text>
        <Heading m={3} fontWeight="heading">
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
          deltagare som samlar ihop flest poäng delar på prispotten.
        </Text>
        <Heading m={3} fontWeight="heading">
          Easy to learn, hard to master
        </Heading>
        <Text sx={{ fontFamily: "body", lineHeight: "body" }} m={3}>
          Din uppgift som deltagare är både enkel och svår: välj de 5 spelarna
          som du tror gör flest mål och assist under omgången. Om många
          deltagare vinner blir utdelningen lägre, om du är ensam vinnare vinner
          du stort.
        </Text>
        <Text sx={{ fontFamily: "body", lineHeight: "body" }} m={3}>
          Du behöver inte välja en full elva plus avbytarbänk, och du behöver
          inte slänga in spelare du egentligen inte tror på för att hålla dig
          till en budget. Sillyfootball skiljer sig från andra fantasy
          football-spel genom att vara så enkelt som möjligt.
        </Text>
        <Heading m={3} fontWeight="heading">
          Sillyfootball beta
        </Heading>
        <Text sx={{ fontFamily: "body", lineHeight: "body" }} m={3}>
          Sillyfootball är helt gratis att spela under betaperioden som pågår.
          Varje vecka kan du vara med och tävla om 1000kr som delas ut till
          vinnarna. Allt du behöver göra är att välja dina 5 spelare och lämna
          in ditt lag innan deadline på lördagar.
        </Text>
        <Box textAlign="center" my={4}>
          <Link to="/game/">
            <Button mx={1} fontSize={[5, 6]} bg="primary">
              <Heading fontWeight="heading" color="black">
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
