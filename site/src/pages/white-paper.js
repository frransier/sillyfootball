import React from "react"
import { Box, Text, Heading, Button } from "rebass"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { motion } from "framer-motion"
import Nav from "../components/nav"

const WhitePaperPage = () => (
  <Layout>
    <SEO title="White paper" />
    <Nav />

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
          football kan vara krångligt och tidskrävande. Det tar tid att ta ut
          sin elva, poängsystemet är jobbigt att lära sig och man tvingas välja
          spelare från bonkgäng som Everton för att få plats med sina
          Liverpool-stjärnor.
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
          Lätt att lära sig, svårt att bemästra
        </Heading>
        <Text sx={{ fontFamily: "body", lineHeight: "body" }} m={3}>
          Din uppgift som deltagare är både enkel och svår: välj de 5 spelarna
          som du tror gör flest mål och assist under omgången. Om många
          deltagare vinner blir utdelningen lägre, om du är ensam vinnare vinner
          du stort.
        </Text>

        <Heading m={3} fontWeight="heading">
          Gratis
        </Heading>
        <Text sx={{ fontFamily: "body", lineHeight: "body" }} m={3}>
          Sillyfootball är helt gratis att spela. Varje vecka kan du vara med
          och tävla minst 1000kr. Allt du behöver göra är att välja 5 spelare
          och lämna in ditt lag innan deadline på lördagar.
        </Text>
        <Heading m={3} fontWeight="heading">
          Utdelning
        </Heading>
        <Text sx={{ fontFamily: "body", lineHeight: "body" }} m={3}>
          Prispotten är som standard 1000 kronor och fördelas 70% till de
          deltagarna som får högst poäng samt 30% till de som får näst högst
          poäng. Om ingen samlar ihop minst 5p halveras utdelningen och sparas
          till nästa omgång som Jackpot.
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
