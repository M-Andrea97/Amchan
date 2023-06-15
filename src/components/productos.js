import "../app/globals.css";
export default function Product(props) {
  return (
    <li>
      <a href="#" className="block overflow-hidden group">
        <img
          src={props.object.image}
          alt=""
          className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
        />

        <div className="relative pt-3 bg-white">
          <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
            {props.object.title}
          </h3>

          <p className="mt-2">
            <span className="sr-only">Precio</span>

            <span className="tracking-wider text-gray-900"> 
                $ {props.object.price}
                <span className="text-sm"> USD</span>  
            </span>
          </p>
        </div>
      </a>
    </li>
    
    
  );
}
  

  