import React, { useState } from "react";
import {
  Database,
  Server,
  FileText,
  ArrowRight,
  Filter,
  Layers,
  Search,
  BrainCircuit,
  Lightbulb,
  BarChart3,
  PieChart,
  Users,
  ShoppingCart,
  Activity,
  Box,
  ArrowDown,
  Globe,
  Clock,
  Code,
  Terminal,
  Cpu,
  LucideProps,
} from "lucide-react";

// Define types for the data structures
type TabType = "warehousing" | "mining" | "r-mining";

interface Step {
  id: string;
  title: string;
  icon: React.ReactElement<LucideProps>;
  description: string;
  color: string;
  details?: string[]; // Optional: for Warehousing/Mining
  code?: string; // Optional: for R workflow
}

const DataVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("warehousing");
  const [activeStep, setActiveStep] = useState<number>(0);

  // Data for Warehousing Flow (Architecture)
  const warehouseSteps: Step[] = [
    {
      id: "sources",
      title: "Tier 1: Data Sources",
      icon: <Database className="w-8 h-8 text-blue-500" />,
      description:
        "The bottom tier. Raw data is ingested from operational databases (CRM, ERP) and external feeds.",
      details: ["Operational DBs", "Flat Files", "APIs"],
      color: "bg-blue-100 border-blue-300",
    },
    {
      id: "etl",
      title: "Tier 1.5: ETL (Staging)",
      icon: <Filter className="w-8 h-8 text-purple-500" />,
      description:
        'The Staging Area. Data is Extracted, Transformed (Cleaned), and Loaded. This is the "Gatekeeper".',
      details: ["Cleaning", "Integration", "Transformation"],
      color: "bg-purple-100 border-purple-300",
    },
    {
      id: "warehouse",
      title: "Tier 2: Warehouse (Storage)",
      icon: <Server className="w-8 h-8 text-indigo-600" />,
      description:
        "The Middle Tier. A central OLAP repository organized by subject (Star/Snowflake Schema).",
      details: ["Data Marts", "Meta Data", "Historical Storage"],
      color: "bg-indigo-100 border-indigo-300",
    },
    {
      id: "analytics",
      title: "Tier 3: Analytics (Client)",
      icon: <BarChart3 className="w-8 h-8 text-green-500" />,
      description:
        "The Top Tier (Front-end). Users interact with data via mining tools, reports, and dashboards.",
      details: ["Query Tools", "Reporting", "Data Mining"],
      color: "bg-green-100 border-green-300",
    },
  ];

  // Data for Mining Flow (KDD Process)
  const miningSteps: Step[] = [
    {
      id: "selection",
      title: "1. Selection",
      icon: <Layers className="w-8 h-8 text-gray-600" />,
      description:
        "Selecting the target dataset from the larger warehouse. Focusing on relevant attributes.",
      details: ["Target Data", "Attribute Selection"],
      color: "bg-gray-100 border-gray-300",
    },
    {
      id: "preprocessing",
      title: "2. Pre-processing",
      icon: <Filter className="w-8 h-8 text-orange-500" />,
      description:
        "Cleaning data: Handling missing values (Imputation), noise, and outlier detection.",
      details: ["Noise Removal", "Imputation", "Outlier Detection"],
      color: "bg-orange-100 border-orange-300",
    },
    {
      id: "transformation",
      title: "3. Transformation",
      icon: <Activity className="w-8 h-8 text-teal-500" />,
      description:
        "Preparing data for algorithms: Normalization (scaling) and Discretization.",
      details: ["Normalization", "Aggregation", "Constructing Features"],
      color: "bg-teal-100 border-teal-300",
    },
    {
      id: "mining",
      title: "4. Data Mining",
      icon: <BrainCircuit className="w-8 h-8 text-red-500" />,
      description:
        "Functionalities: Applying algorithms like Clustering, Classification, and Association Rules.",
      details: ["Pattern Discovery", "Model Building", "Classification"],
      color: "bg-red-100 border-red-300",
    },
    {
      id: "evaluation",
      title: "5. Interpretation",
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      description:
        "Evaluating patterns to ensure they are valid, novel, and useful knowledge.",
      details: ["Pattern Eval", "Visualization", "Deployment"],
      color: "bg-yellow-100 border-yellow-300",
    },
  ];

  // Data for R Workflow
  const rSteps: Step[] = [
    {
      id: "r-import",
      title: "1. Import & Tidy",
      icon: <FileText className="w-8 h-8 text-cyan-600" />,
      description:
        "Using `readr` and `tidyr` to load data into a Data Frame (Tibble).",
      code: 'library(tidyverse)\ndata <- read_csv("sales.csv") %>%\n  clean_names()',
      color: "bg-cyan-100 border-cyan-300",
    },
    {
      id: "r-manipulate",
      title: "2. Manipulation",
      icon: <Terminal className="w-8 h-8 text-blue-600" />,
      description:
        'Using `dplyr` for the "Pre-processing" stage (Filter, Select, Mutate).',
      code: "clean_data <- data %>%\n  filter(age > 18) %>%\n  mutate(score = scale(raw_score))",
      color: "bg-blue-100 border-blue-300",
    },
    {
      id: "r-visualize",
      title: "3. Visualization",
      icon: <PieChart className="w-8 h-8 text-pink-500" />,
      description: "Using `ggplot2` for Exploratory Data Analysis (EDA).",
      code: "ggplot(clean_data, aes(x=age, y=score)) +\n  geom_point() +\n  geom_smooth()",
      color: "bg-pink-100 border-pink-300",
    },
    {
      id: "r-model",
      title: "4. Modeling",
      icon: <Cpu className="w-8 h-8 text-emerald-600" />,
      description:
        "Using `caret` or `tidymodels` to run algorithms (Random Forest, SVM).",
      code: 'model <- train(\n  target ~ ., data = train_set,\n  method = "rf"\n)',
      color: "bg-emerald-100 border-emerald-300",
    },
    {
      id: "r-communicate",
      title: "5. Communicate",
      icon: <Globe className="w-8 h-8 text-indigo-500" />,
      description: 'Using RMarkdown or Shiny to present the "Mined Knowledge".',
      code: '---\ntitle: "Analysis Report"\noutput: html_document\n---',
      color: "bg-indigo-100 border-indigo-300",
    },
  ];

  let currentSteps: Step[];
  if (activeTab === "warehousing") currentSteps = warehouseSteps;
  else if (activeTab === "mining") currentSteps = miningSteps;
  else currentSteps = rSteps;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Data Science Concepts Visualizer
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Interactive guide to Mining, Warehousing, and R Implementation.
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto">
          <div className="bg-white p-1 rounded-full shadow-md inline-flex whitespace-nowrap">
            <button
              onClick={() => {
                setActiveTab("warehousing");
                setActiveStep(0);
              }}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === "warehousing"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Data Warehousing
            </button>
            <button
              onClick={() => {
                setActiveTab("mining");
                setActiveStep(0);
              }}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === "mining"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Data Mining (KDD)
            </button>
            <button
              onClick={() => {
                setActiveTab("r-mining");
                setActiveStep(0);
              }}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === "r-mining"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Code className="w-4 h-4" /> R Implementation
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: The Visual Flow */}
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              {activeTab === "warehousing" && (
                <Server className="text-blue-500" />
              )}
              {activeTab === "mining" && <Search className="text-red-500" />}
              {activeTab === "r-mining" && (
                <Terminal className="text-slate-700" />
              )}

              {activeTab === "warehousing" && "Warehouse Architecture"}
              {activeTab === "mining" && "The KDD Process"}
              {activeTab === "r-mining" && "The R Workflow"}
            </h2>

            {/* Diagram Container */}
            <div className="relative">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
                {currentSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className="flex flex-col items-center group relative w-full md:w-auto"
                  >
                    {/* Connection Line (Desktop) */}
                    {index < currentSteps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-1/2 w-full h-1 bg-slate-200 -z-10">
                        <div
                          className={`h-full transition-all duration-500 
                            ${
                              index < activeStep
                                ? activeTab === "warehousing"
                                  ? "bg-blue-400"
                                  : activeTab === "mining"
                                  ? "bg-red-400"
                                  : "bg-slate-600"
                                : "bg-transparent"
                            }`}
                          style={{ width: "100%" }}
                        />
                      </div>
                    )}

                    {/* Connection Line (Mobile) */}
                    {index < currentSteps.length - 1 && (
                      <div className="md:hidden h-8 w-1 bg-slate-200 my-2"></div>
                    )}

                    {/* Step Circle */}
                    <button
                      onClick={() => setActiveStep(index)}
                      className={`
                        w-16 h-16 rounded-full flex items-center justify-center border-4 shadow-sm transition-all duration-300 z-20 relative
                        ${
                          index === activeStep
                            ? activeTab === "warehousing"
                              ? "bg-blue-50 border-blue-500 scale-110"
                              : activeTab === "mining"
                              ? "bg-red-50 border-red-500 scale-110"
                              : "bg-slate-100 border-slate-700 scale-110"
                            : index < activeStep
                            ? activeTab === "warehousing"
                              ? "bg-blue-500 border-blue-500 text-white"
                              : activeTab === "mining"
                              ? "bg-red-500 border-red-500 text-white"
                              : "bg-slate-700 border-slate-700 text-white"
                            : "bg-white border-slate-200 hover:border-slate-300"
                        }
                      `}
                    >
                      {index < activeStep ? (
                        <ArrowRight className="w-6 h-6" />
                      ) : (
                        step.icon
                      )}
                    </button>

                    {/* Label */}
                    <span
                      className={`mt-3 text-xs font-bold uppercase tracking-wider ${
                        index === activeStep
                          ? "text-slate-800"
                          : "text-slate-400"
                      }`}
                    >
                      {step.title.split(" ")[0]}...
                    </span>
                  </div>
                ))}
              </div>

              {/* Animation/Detail Layer */}
              <div className="mt-12 bg-slate-50 rounded-xl p-8 border border-slate-200 min-h-[300px] flex items-center justify-center relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-5">
                  {[...Array(36)].map((_, i) => (
                    <div key={i} className="border border-slate-900"></div>
                  ))}
                </div>

                {/* Dynamic Content Based on Step */}
                <div
                  className="text-center z-10 max-w-lg w-full animate-in fade-in slide-in-from-bottom-4 duration-500"
                  key={activeStep}
                >
                  <div
                    className={`inline-flex p-4 rounded-full mb-6 ${currentSteps[activeStep].color}`}
                  >
                    {React.cloneElement(currentSteps[activeStep].icon, {
                      className: "w-12 h-12",
                    })}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    {currentSteps[activeStep].title}
                  </h3>
                  <p className="text-slate-600 mb-6 text-lg">
                    {currentSteps[activeStep].description}
                  </p>

                  {/* If R Tab, show Code Block, else show Tags */}
                  {activeTab === "r-mining" ? (
                    <div className="bg-slate-900 rounded-lg p-4 text-left shadow-lg font-mono text-sm overflow-x-auto border border-slate-700">
                      <div className="flex gap-1.5 mb-3 border-b border-slate-700 pb-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-slate-500 text-xs ml-2">
                          script.R
                        </span>
                      </div>
                      <pre className="text-green-400">
                        {currentSteps[activeStep].code}
                      </pre>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {currentSteps[activeStep].details &&
                        currentSteps[activeStep].details.map((detail, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-600 font-medium shadow-sm"
                          >
                            {detail}
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Key Differences & Concepts */}
          <div className="lg:col-span-4 space-y-6">
            {/* Context Card */}
            <div
              className={`p-6 rounded-2xl shadow-lg text-white transition-colors duration-500 
              ${
                activeTab === "warehousing"
                  ? "bg-gradient-to-br from-blue-600 to-indigo-700"
                  : activeTab === "mining"
                  ? "bg-gradient-to-br from-red-600 to-orange-700"
                  : "bg-gradient-to-br from-slate-700 to-slate-900"
              }`}
            >
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                {activeTab === "warehousing" && <Box />}
                {activeTab === "mining" && <BrainCircuit />}
                {activeTab === "r-mining" && <Terminal />}

                {activeTab === "warehousing" && "Concept: Storage"}
                {activeTab === "mining" && "Concept: Discovery"}
                {activeTab === "r-mining" && "Concept: Implementation"}
              </h3>
              <p className="opacity-90 leading-relaxed text-sm">
                {activeTab === "warehousing" &&
                  "A Data Warehouse is a centralized repository (Library) that stores structured, historical data from multiple sources. It uses a 3-tier architecture to separate transaction processing from analysis."}
                {activeTab === "mining" &&
                  "Data Mining (KDD) is the process of discovering patterns in large datasets. It involves selecting, cleaning, transforming, and modeling data to find hidden insights (The Detective)."}
                {activeTab === "r-mining" &&
                  "R is the language of choice for Data Mining due to its powerful 'Tidyverse' ecosystem for cleaning data and 'Caret' for running complex machine learning models with minimal code."}
              </p>
            </div>

            {/* Sidebar Content Changes based on Tab */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4 text-lg">
                {activeTab === "r-mining"
                  ? "Essential R Libraries"
                  : "Types of Data Handled"}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {activeTab === "warehousing" && (
                  <>
                    <div className="p-3 bg-blue-50 rounded-lg text-center">
                      <Database className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <span className="text-xs font-bold text-slate-700 block">
                        Structured
                      </span>
                      <span className="text-[10px] text-slate-500">
                        SQL Tables, CSV
                      </span>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg text-center">
                      <FileText className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <span className="text-xs font-bold text-slate-700 block">
                        Metadata
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Data about data
                      </span>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg text-center col-span-2">
                      <Layers className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <span className="text-xs font-bold text-slate-700 block">
                        Historical Data
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Time-variant (5-10 yrs)
                      </span>
                    </div>
                  </>
                )}

                {activeTab === "mining" && (
                  <>
                    <div className="p-3 bg-red-50 rounded-lg text-center">
                      <Database className="w-6 h-6 text-red-500 mx-auto mb-2" />
                      <span className="text-xs font-bold text-slate-700 block">
                        Relational
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Tables & Transact.
                      </span>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg text-center">
                      <FileText className="w-6 h-6 text-red-500 mx-auto mb-2" />
                      <span className="text-xs font-bold text-slate-700 block">
                        Unstructured
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Text, Web, Media
                      </span>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg text-center">
                      <Clock className="w-6 h-6 text-red-500 mx-auto mb-2" />
                      <span className="text-xs font-bold text-slate-700 block">
                        Time-Series
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Stocks, Sensors
                      </span>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg text-center">
                      <Globe className="w-6 h-6 text-red-500 mx-auto mb-2" />
                      <span className="text-xs font-bold text-slate-700 block">
                        Spatial
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Maps, GPS
                      </span>
                    </div>
                  </>
                )}

                {activeTab === "r-mining" && (
                  <>
                    <div className="p-3 bg-slate-50 rounded-lg text-center">
                      <Filter className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                      <span className="text-xs font-bold text-slate-700 block">
                        dplyr
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Manipulation
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg text-center">
                      <PieChart className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                      <span className="text-xs font-bold text-slate-700 block">
                        ggplot2
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Visualization
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg text-center">
                      <Cpu className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                      <span className="text-xs font-bold text-slate-700 block">
                        caret
                      </span>
                      <span className="text-[10px] text-slate-500">
                        ML Models
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg text-center">
                      <FileText className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                      <span className="text-xs font-bold text-slate-700 block">
                        readr
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Data Import
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Real World Examples / Key Functionalities */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4 text-lg">
                {activeTab === "mining"
                  ? "Key Functionalities"
                  : "Real World Examples"}
              </h3>
              <div className="flex flex-col gap-3">
                {activeTab === "warehousing" && (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <ShoppingCart className="w-5 h-5 text-blue-500" />
                      <span className="text-sm text-slate-700">
                        Consolidating global sales for Q4 report
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <Activity className="w-5 h-5 text-blue-500" />
                      <span className="text-sm text-slate-700">
                        Hospital tracking bed occupancy over 5 years
                      </span>
                    </div>
                  </>
                )}
                {activeTab === "mining" && (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-sm text-slate-700">
                        <strong>Classification:</strong> Spam vs Not Spam
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-sm text-slate-700">
                        <strong>Clustering:</strong> Customer Segmentation
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-sm text-slate-700">
                        <strong>Association:</strong> Market Basket Analysis
                      </span>
                    </div>
                  </>
                )}
                {activeTab === "r-mining" && (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <Code className="w-5 h-5 text-slate-600" />
                      <span className="text-sm text-slate-700">
                        Automated Fraud Detection Scripts
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <Code className="w-5 h-5 text-slate-600" />
                      <span className="text-sm text-slate-700">
                        Sentiment Analysis on Twitter Feeds
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualizer;
