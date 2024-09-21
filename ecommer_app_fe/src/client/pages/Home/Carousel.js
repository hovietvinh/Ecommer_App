import React from 'react';
import { Carousel, Empty,Badge } from 'antd';
import './carousel.css'; // Import file CSS tùy chỉnh
import BoxHead from '../../components/BoxHead';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function App() {
    const stateProducts = useSelector(state => state.ProductReducerClient);
    
    const contentStyle = {
        margin: 0,
        height: 'auto',
        color: 'black',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#fff',
    };

    const getPriceNew = (price, discount) => {
        return (price - price * discount / 100).toFixed(0);
    };

    return (
        <>
            <Carousel dots={false} arrows infinite={true} autoplay className="custom-carousel h-full">
                <div className='featured'>
                    <div className="container max-w-[80%] mx-auto my-5">
                        <div className="grid grid-cols-1 gap-4">
                            <BoxHead text="Sản phẩm nổi bật" />     
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                                {stateProducts.products.length > 0 ? (
                                    stateProducts.products.map((product) => (
                                        product.featured === "1" && (
                                           
                                                <NavLink to={`/products/detail/${product.slug}`} key={product._id}   className="rounded-lg overflow-hidden border border-gray-300">
                                                     <Badge.Ribbon text="Nổi bật" color="red"  className='rounded-md m-1'>
                                                     <div className="w-full aspect-[4/3] border border-gray-300">
                                                        <img className="w-full h-full object-cover" src={product.thumbnail?product.thumbnail:"https://lh4.googleusercontent.com/proxy/IEU20xZDxGIL6f-PIiD-uSnnbAflCtBb2ZSY3tXouFuAYAi-Ehi0ijol5w075iG5KkAICJI1dSpzy6LKGrpd4mxX6A0bJNvWBFpDajmZR97wXUfbXA"}></img>
                                                    </div>
                                                    <div className="p-[15px]">
                                                        <h3 className="text-[20px] font-semibold">{product.title}</h3>
                                                        <div className="text-[18px] text-green-500 font-semibold">{getPriceNew(product.price,product.discountPercentage)}$</div>
                                                        <div className="text-[18px] text-red-500 font-semibold line-through	">{product.price}$</div>
                                                        <div className="text-[14px] font-semibold text-white bg-red-500 inline-block py-1 px-3 rounded-lg">-{product.discountPercentage}%</div>
                                                    </div>
                                                     </Badge.Ribbon>
                                                    
                                                </NavLink>
                                         
                                        )
                                    ))
                                ) : (
                                    <Empty />
                                )}
                            </div>
                    </div>
                </div>

                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
        </>
    );
};

export default App;
