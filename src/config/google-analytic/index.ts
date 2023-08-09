import * as dotenv from "dotenv";
dotenv.config();

const config = {
  analytic: {
    propertyId: process.env.ANALYTIC_MEASUREMENT_ID,
    apiSecret: process.env.ANALYTIC_API_SECRET,
  },
};

export default config;
