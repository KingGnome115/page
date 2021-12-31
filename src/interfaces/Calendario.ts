import { render } from "vue";

    const date = new Date();
    const renderCalendar = () => {date.setDate(1)};
    const monthDays = document.querySelector(".days");
    const diasMes = new Date(date.getFullYear(), date.getMonth() + 1,0).getDate();
    const diaAnterior = new Date(date.getFullYear(), date.getMonth(),0).getDate();
    const primerDiaIndex = date.getDate();
    const ultimoDiaIndex = new Date(date.getFullYear(), date.getMonth() + 1,0).getDate();
    const siguienteDia = - ultimoDiaIndex -1
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    document.querySelector(".date h1").innerHTML = meses[date.getMonth()];
    document.querySelector(".date p").innerHTML = new Date().toDateString();
    let dias = "";
    for(let x = primerDiaIndex; x>=0; x--){
        dias += '<div classs="prev-date">${diaAnterior - x + 1}</div>';
    }
    for(let i = 1; i<= diaAnterior; i++){
        if(
            i === new Date().getDate() && date.getMonth() === new Date().getMonth()
        )
        {
            dias += '<div class="Hoy">${i}</div>';
        } else {
            dias += '<div>${i}</div>';
        }
    }
    for(let j=1; j<= siguienteDia; j++){
        dias += '<div class="next-date">${j}</div>';
        diasMes.innerHTML = dias;
    }
};
    document.querySelector(".prev")?.addEventListener("click, () => {
        date.setMonth(date.getMonth()-1");
        renderCalendar();
    });
    document.querySelector(".next")?.addEventListener("click, () => {
        date.setMonth(date.getMonth()+1");
        renderCalendar();
    });
    renderCalendar();



