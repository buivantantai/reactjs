 // Tính diện tích hình thang (a + b) * h * (c/ d) + (e - f) /2
  // Thực hiện phép cộng mất 3000ms
  // Thực hiện phép nhân mất 2000ms
  // Thực hiện phép chia mất 1000ms
  // Trả về kết quả cuối cùng.
  // Sử dụng callback để xử lý

const phepCong = (a,b,cb) => {
    console.log('Thuc hien phep cong');
    setTimeout(() => {
      const sum = a+b;
      console.log('Cong xong',sum);
      cb(sum);
    },3000);
  };
  
  const phepNhan = (a,b,cb) => {
    console.log('Thuc hien phep nhan');
    setTimeout(() => {
      const mul = a*b;
      console.log('Nhan xong',mul);
      cb(mul);
    },2000);
  };
  
  const phepChia = (a,b,cb) => {
    console.log('Thuc hien phep chia');
    setTimeout(() => {
      const div = a/b;
      console.log('Chia xong',div);
      cb(div);
    },1000);
  };
  
  const phepTru = (a,b,cb) => {
    console.log('Thuc hien phep tru');
    setTimeout(() => {
      const tru = a-b;
      console.log('Tru xong',tru);
      cb(tru);
    },500);
  };
  
  
 
  // Tính diện tích hình thang (a + b) * h * (c/ d) + (e - f) /2
  const dienTich= (a, b,c,d,e,f, h) =>{
    phepCong(a,b,(kqSum) => {
      phepChia(c,d,(kqChia) =>{
        phepTru(e,f,(kqTru) => {
          phepNhan(kqSum,h,(kqNhan1) => {
            phepNhan(kqNhan1,kqChia,(kqNhan2) => {
              phepChia(kqTru,2,(kqChia2) => {
                phepCong(kqNhan2,kqChia2,(kqTong) =>{
                  console.log(kqTong);
                })
              })
            })
          })
        })
      })
    })
  }
  
  dienTich(5,6,10,3,4,2,5);