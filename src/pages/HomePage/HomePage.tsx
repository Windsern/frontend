import "./HomePage.sass"
import image from "/src/assets/home.png"

const HomePage = () => {
    return (
        <div className="home-page-wrapper">
            <h2>Добро пожаловать на сайт технадзора строительных объектов МГТУ!</h2>
            <p>Здесь вы можете узнать статус готовности корпусов МГТУ, находящихся на данный момент в процессе строительства</p>
            <img src={image} />
        </div>
    )
}

export default HomePage