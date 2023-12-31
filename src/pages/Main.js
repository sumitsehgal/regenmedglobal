import React, { useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Layout, Input, Button, Form, AutoComplete } from "antd";
import insertTopSearch from "./insertTopSearch";
import axios from "axios";
import { terms, MAPBOX_TOKEN } from "../config";
import imgHeroBG from "../assets/hero-bg.png";
import imgVector from "../assets/Vector.png";
import imgCombined from "../assets/Combined-Shape.png";
import imgPro2 from "../assets/pro-2.png";
import imgPro1 from "../assets/pro-1.png";
import imgPro3 from "../assets/pro-3.png";
import imgPro4 from "../assets/pro-4.png";
import imgEli1 from "../assets/eli.png"
import imgEli2 from "../assets/eli-2.png"
import imgEli3 from "../assets/eli-3.png"
import Faq from "../components/Faq";
import ContactForm from "../components/ContactForm";


const questions = [
  {
    question: "Is there a free trial available?",
    answer: "Yes, you can try us for free for 30 days. If you want, we'll provide with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    question: "Can I change my plan later?",
    answer: "Yes, you can try us for free for 30 days. If you want, we'll provide with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "Yes, you can try us for free for 30 days. If you want, we'll provide with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    question: "Can other info be added to an invoice?",
    answer: "Yes, you can try us for free for 30 days. If you want, we'll provide with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    question: "How does billing work?",
    answer: "Yes, you can try us for free for 30 days. If you want, we'll provide with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    question: "How do I change my account email?",
    answer: "Yes, you can try us for free for 30 days. If you want, we'll provide with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
];

const StyledErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
`;


const Main = () => {
  const [address, setAddress] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [options, setOptions] = useState([]);
  // Define suggestions state
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = useCallback((value) => {
    const filterTerm = value.trim(); // Trim any leading or trailing whitespace
    setSearchTerm(filterTerm);

    const filteredOptions = terms
      .filter((term) => term.toLowerCase().includes(filterTerm.toLowerCase()))
      .map((term) => ({ value: term }));

    setOptions(filteredOptions);
  }, []);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (!address) {
          setErrorMessage("Please enter a location");
        } else {
          const filterTerm = searchTerm.trim(); // Trim any leading or trailing whitespace
          console.log("Search term:", filterTerm);

          // Update top searches in the database
          insertTopSearch(filterTerm);

          // Update top searches in the database
          console.log("Before updateTopSearches");
          // updateTopSearches(filterTerm);
          console.log("After updateTopSearches");

          navigate("/results", {
            state: {
              searchTerm: filterTerm,
              location: address,
              checkedOptions: checkboxOptions,
            },
          });
        }
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });

      return false
  };

  const handleAddressChange = async (value) => {
    setAddress(value);

    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          value
        )}.json?access_token=${MAPBOX_TOKEN}`
      );

      // Filter suggestions for US cities
      const usCities = response.data.features.filter(
        (suggestion) =>
          suggestion.context &&
          suggestion.context.find(
            (context) => context.id.startsWith("country") && context.short_code === "us"
          )
      );

      setSuggestions(usCities);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };


  const [checkboxOptions, setCheckboxOptions] = useState([
    { label: "PRP", value: "PRP", checked: false },
    { label: "Stem Cell Therapy", value: "Stem", checked: false },
    { label: "Prolotherapy", value: "Prolotherapy", checked: false },
  ]);

  const handleButtonClick = (value) => {
    const updatedOptions = checkboxOptions.map((option) =>
      option.value === value ? { ...option, checked: !option.checked } : option
    );
    setCheckboxOptions(updatedOptions);
  };

  const handleButtonStyle = (value) => {
    const option = checkboxOptions.find((option) => option.value === value);
    return option.checked
      ? { color: "white", backgroundColor: "var(--main-color)" }
      : {};
  };

  console.log("Render options:", options);

  return (
    <Layout>
      <div className="banner-top">
        <img className="bottom-vector" src={imgHeroBG} alt="" />
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="banner-left">
                <p className="banner-left-p">Find a Regenerative Medicine Doctor based on your condition</p>
                <div className="banner-bottom">
                  <Form form={form} onFinish={handleSubmit} >
                  {errorMessage && (
                    <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
                  )}
                  <div className="more">
                      <p className="more-p">Choose Treatment Type(s):</p>
                      {checkboxOptions.map((option) => (
                        <Button
                          className={option.checked ? "type-button active" : "type-button"}
                          type={option.checked ? "primary" : "default"}
                          onClick={() => handleButtonClick(option.value)}
                          style={handleButtonStyle(option.value)}
                          key={option.value}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  <ul className="banner-ul">
                      <li>
                        <img src={imgCombined} className="vec-1" alt="" />
                        <AutoComplete
                          style={{ width: "70vw", maxWidth: "300px", height: "50px", marginLeft: '4rem' }}
                          value={address}
                          onSelect={(value) => setAddress(value)}
                          onSearch={handleAddressChange}
                          placeholder="Enter a location..."
                          options={suggestions.map((suggestion) => ({
                            label: suggestion.place_name,
                            value: suggestion.place_name,
                          }))}
                        />
                      </li>
                      <li>
                        <img src={imgVector} className="vec-1" alt="" />
                        <AutoComplete
                          style={{ width: "70vw", maxWidth: "450px", height: "50px" }}
                          options={options}
                          onSelect={(value) => setSearchTerm(value)}
                          onSearch={handleSearch}
                          placeholder="Medical condition (optional)"
                        />
                      </li>

                      <li>
                        <button className="serch search-button" htmltype="submit" >Search</button>
                      </li>
                    </ul>
                    
                    

                  </Form>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="banner-right">
                <img className="pro-img-3" src={imgPro2} alt="" />
                <img className="pro-img-2" src={imgPro1} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Regenerative">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="Regenerative-left">
                <img src={imgPro3} className="reg-img" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="Regenerative-right">
                <p className="Regenerative-p">What is Regenerative Medicine?</p>
                <p className="Regenerative-p1">The process of repairing or regenerating human cells, tissues, or organs as a result of disease, aging, or defects. </p>
                {/* <button className="Regenerative-button">Explore Now</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="our-services">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="service-top">
                {/* <p className="service-1">Our Services To You</p> */}
                <p className="service-2">What you can find here</p>
                <p className="service-3">Find a Regenerative Medicine Doctor that offers the types of treatments below:</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="common-service">
                <img src={imgEli3} className="eli-img" alt="" />
                <p className="stem-p">Stem Cell Therapy</p>
                <p className="stem-p1">Stem cell therapy is a form of regenerative medicine designed to repair damaged cells within the body by reducing inflammation and modulating the immune system.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="common-service">
                <img src={imgEli2} className="eli-img" alt="" />
                <p className="stem-p">PRP / Platelet Rich Plasma</p>
                <p className="stem-p1">Platelet-rich plasma (PRP) therapy uses injections of a concentration of a patient’s own platelets to accelerate the healing of injured tendons, ligaments, muscles and joints.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="common-service">
                <img src={imgEli1} className="eli-img" alt="" />
                <p className="stem-p">Prolotherapy</p>
                <p className="stem-p1">Prolotherapy is a non-surgical injection procedure used to relieve back pain by treating connective tissue injuries (ligaments and tendons) of the musculoskeletal system that have not healed by either rest or conservative therapy in order to relieve back pain.</p>
              </div>
            </div>
          </div>
        </div>
      </div>




      <div className="contact-custom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="service-top">

                <p className="service-2">Contact us</p>

              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="left-contact">
                <ContactForm />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="right-contact">
                <img src={imgPro4} className="pro-44" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="faq">
        <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="service-top">

                  <p className="service-2">Frequently asked questions</p>
                  <p className="service-3">Everything you need to know about the product and billing.</p>

                  <Faq questions={questions}/>

                </div>
              </div>
            </div>
        </div>
      </div>

    </Layout>
  );
};

export default Main;
