using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using System.Data.OleDb;

namespace Hackathon1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {

            try {
                OleDbConnection dbconn = new OleDbConnection(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=E:\VisualStudioProjects\Hackathon1\Hackathon1\muthupalani.accdb");
                dbconn.Open();

                
                OleDbCommand comm = new OleDbCommand("select locality,area,ward,street from guidance where gval = '" + comboBox1.Text +"' " , dbconn);

                var data = comm.ExecuteReader();

                while(data.Read()!=false)
                {
                    OleDbCommand comm1 = new OleDbCommand("select locality,area,ward,street,complaint from complaint_details", dbconn);

                    var data1 = comm1.ExecuteReader();

                    while(data1.Read()!=false)
                    {

                        if (data.GetString(0)== data1.GetString(0) && data.GetString(1)== data1.GetString(1) && data.GetString(2)== data1.GetString(2) && data.GetString(3) == data1.GetString(3))
                        {


                            OleDbCommand insertquery = new OleDbCommand("insert into temp (locality,complaint,val) values ('" + data1.GetString(0) + "','" + data1.GetString(4) + "','" + comboBox1.Text + "')", dbconn);
                            insertquery.ExecuteNonQuery();

                        }
                    }
                }
            }
            catch(Exception ex)
            {
                MessageBox.Show("Error " + ex);
            }
        }
          
        private void button2_Click(object sender, EventArgs e)
        {
            OleDbConnection dbconn = new OleDbConnection(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=E:\VisualStudioProjects\Hackathon1\Hackathon1\muthupalani.accdb");
            dbconn.Open();

            OleDbCommand result = new OleDbCommand("select locality,complaint,val from temp group by locality,complaint,val", dbconn);

            var dat = result.ExecuteReader();

            while(dat.Read()!=false)
            {
                OleDbCommand insertquery = new OleDbCommand("insert into result (locality,complaint,val) values ('" + dat.GetString(0) + "','" + dat.GetString(1) + "','" + dat.GetString(2) + "')", dbconn);
                insertquery.ExecuteNonQuery();
            }
            
        }
    }
}