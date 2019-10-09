import React from "react"
import { Box, Text } from "rebass"
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
        <Text my={2} mx={3}>
          <b>Sillyfootball</b> är ett enkelt <b>fantasy football</b> spel som
          spelas över en omgång på <b>12 matcher</b> från Premier Leauge, La
          Liga, Bundesliga och Serie A. Du väljer ut <b>5 valfria spelare</b>{" "}
          från spelschemat och får <b>1 poäng per mål eller assist</b>. När
          omgången är över summeras dina spelares poäng och deltagarna som
          samlar flest poäng delar på prispotten.
        </Text>
        <Text my={4} mx={3}>
          Lämna in ditt lag innan deadline day och tävla mot andra om att ta hem
          beta-prispotten på 1000kr. Under betaperioden är det fritt fram att
          registrera hur många lag man vill utan kostnad. Potten fördelas mellan
          de lag som samlar högst och näst högst poäng. Ju färre vinnare, desto
          större vinst a la Stryktipset. Följ ditt lag i realtid på
          leaderboarden under spelomgången.
        </Text>
        <Text my={4} mx={3}>
          Vinster betalas endast ut till de som anger giltiga Swish-anslutna
          telefonnummer.
        </Text>
      </Box>
    </motion.div>
  </Layout>
)

export default WhitePaperPage
