import React from "react";
import battle from "../../HarryPotter/battle.png"
import concert from "../../HarryPotter/Concert.jpg"
import promnight from "../../HarryPotter/promnight.png"
const MyEvent = () => {
  return (
    <>
      <section className="bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px] ml-10">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <SingleCard
              image={battle}
              CardTitle="Battle Of Potion"
              CardDescription="Embark on a mystical journey into the captivating world of potions, where magic intertwines with science in the most enchanting way possible. Welcome to the Battle of Potions, a mesmerizing event that brings together alchemists, wizards, and potion enthusiasts from far and wide to showcase their mastery in the art of potion-making"
            />
            <SingleCard
              image={concert}
              CardTitle="Harry Potter Concert"
              CardDescription="Immerse yourself in the enchanting world of Harry Potter as you embark on a musical journey unlike any other. Join us for The Magic of Harry Potter: A Musical Journey, an extraordinary concert experience that brings the beloved wizarding world to life through the power of music"
            />
            <SingleCard
              image={promnight}
              CardTitle="Harry Potter Prom Night"
              CardDescription="Dust off your dress robes and polish your dancing shoes because it's time to experience the magic of the Yule Ball at our very own Harry Potter Prom Night! Transporting you straight from the pages of J.K. Rowling's beloved series, this enchanting event promises an evening of wizarding wonder, friendship, and unforgettable memories"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default MyEvent;

const SingleCard = ({
  image,
  CardDescription,
  CardTitle,
}) => {
  return (
    <>
      <div className="mb-5 overflow-hidden rounded-lg  bg-gradient-to-br from-red-950 to-black shadow-1 hover:scale-105 transition duration-200 flex flex-col  items-center">
    <img src={image} alt="" className="w-100%" />
    <div className="p-2 text-center sm:p-5 md:p-4 xl:p-5 ">
        <h3>
            <a
            className="mb-2 text-white block text-lg font-semibold text-dark hover:text-primary sm:text-xl md:text-lg lg:text-xl xl:text-lg 2xl:text-xl"
            >
            {CardTitle}
            </a>
        </h3>
        <p className="mb-4 text-white text-w text-sm leading-snug text-body-color">
            {CardDescription}
        </p>
    </div>
</div>
    </>
  );
};
