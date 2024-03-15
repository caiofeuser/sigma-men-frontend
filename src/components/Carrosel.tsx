﻿import { Fragment } from "react";
import { CartItem } from "@/types";
// import TreatmentCard from "./TreatmentCard";

interface CarroselProps {
  cardsData: any[];
  cardComponent: React.ComponentType<{
    title: string;
    price: number | undefined;
    cardData?: CartItem;
    id?: number;
  }>;
}

export default function Carrosel(props: CarroselProps) {
  const { cardsData, cardComponent: CardComponent } = props;
  return (
    <div
      className="carrosel"
      style={{
        display: "flex",
        overflowX: "scroll",
        gap: "4rem",
        paddingLeft: "4rem",
        paddingBottom: "2rem",
        marginTop: "3rem",
        marginBottom: "4rem",
      }}
    >
      {cardsData.map((card: CartItem, index) => (
        <Fragment key={index}>
          <CardComponent
            cardData={card}
            title={card.title}
            price={card.price}
            id={card.id}
          />
        </Fragment>
      ))}
    </div>
  );
}
