import React from "react";
import { Container } from "react-bootstrap";

export default function AnimeTrailer({ animeLocal }) {
  return (
    <div>
      <Container>
        <div className="ratio ratio-16x9">
          <iframe
            src={animeLocal.data.trailer.embed_url}
            title="YouTube video"
            allowFullScreen
          ></iframe>
        </div>
      </Container>
    </div>
  );
}
