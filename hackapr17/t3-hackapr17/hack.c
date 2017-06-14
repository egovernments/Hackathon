#include<stdio.h>
#include<string.h>
void main()
{

    FILE *fp1=fopen("student.txt","r");
    FILE *fp2=fopen("Usn.txt","r");
    FILE *fp4=fopen("complain.txt","r");
    FILE *fp5=fopen("datec.txt","r");
    FILE *fp6=fopen("dater.txt","r");
    FILE *fp7=fopen("iscr.txt","r");
    FILE *fp8=fopen("gv.txt","r");
    FILE *fp3=fopen("outp.txt","w");
    char usn[100],name[100],comp[100],datec[100],dater[100],iscr[100],gv[100];
    if(fp1==NULL||fp2==NULL||fp3==NULL)
    {
        puts("could not open file");
        exit(0);
    }
    while(!feof(fp1)&&!feof(fp2)&&!feof(fp4)&&!feof(fp5)&&!feof(fp6)&&!feof(fp7))
    {
        fscanf(fp1,"%s",name);
        fscanf(fp2,"%s",usn);
        fscanf(fp2,"%s",comp);
        fscanf(fp2,"%s",datec);
        fscanf(fp2,"%s",dater);
        fscanf(fp2,"%s",iscr);
        fscanf(fp2,"%s",gv);
        fprintf(fp3,"%s\t\t%s\t\t%s\t\t%s\t\t%s\t\t%s\t\t%s\n",name,usn,comp,datec,dater,iscr,gv);
    }



    printf("\n file merged\n");
    fclose(fp1);
    fclose(fp2);
    fclose(fp3);
    fclose(fp4);
    fclose(fp5);fclose(fp6);fclose(fp7);fclose(fp8);
    fp3=fopen("outp.txt","r");
    while(!feof(fp3))
    {
        fscanf(fp3,"%s",name);
        fscanf(fp3,"%s\n",usn);
        printf("%s\t\t%s\t\t%s\t\t%s\t\t%s\t\t%s\t\t%s\n",name,usn,comp,datec,dater,iscr,gv);
    }
    fclose(fp3);


}
