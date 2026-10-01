import Link from "next/link";

function DishCard({ dish }) {
  return (
    <article className="dish-card">
      <div className="dish-image-wrapper">
        <img
          src={dish.image}
          alt={dish.name}
        />

        <span className="dish-category">
          {dish.category}
        </span>
      </div>

      <div className="dish-content">
        <h2>{dish.name}</h2>

        <p className="dish-description">
          {dish.description}
        </p>

        <div className="dish-bottom">
          <div>
            <span className="price-label">
              PRICE
            </span>

            <strong className="dish-price">
              {dish.price} ETB
            </strong>
          </div>

          <Link
            href={`/menu/${dish.id}`}
            className="view-button"
          >
            View →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default DishCard;